import { auth } from "~/lib/auth.server";
import { openai } from "~/lib/openai";
import { prisma } from "~/lib/prisma";
import { getPropmt } from "~/lib/prompts";

interface RequestBody {
  title: string;
  categoria: string;
  meta: {
    content: string;
    lessons?: number;
  };
}

export async function insertRequest(
  request: Request,
  studentId: string,
  body: RequestBody
) {
  const session = await auth.api.getSession(request);
  const id = session!.user.id;

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
      registeredBy: {
        id,
      },
    },
    include: {
      report: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const data = await prisma.requests.create({
    data: {
      type: body.categoria,
      title: body.title,
      meta: body.meta,
      student: {
        connect: {
          id: student.id,
        },
      },
    },
  });

  const prompt = getPropmt(
    data.type as any,
    student.report[0].textContent,
    JSON.parse(JSON.stringify(data.meta)).content,
    JSON.parse(JSON.stringify(data.meta)).lessons
  );

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4o-mini",
  });

  const answer = response.choices[0].message.content;

  await prisma.requests.update({
    where: {
      id: data.id,
    },
    data: {
      content: answer,
      status: "SUCCESS",
    },
  });

  return {
    status: "success",
    data,
  };
}
