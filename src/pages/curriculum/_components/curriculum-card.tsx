import { Separator } from "@/components/ui/separator";
import type { CurriculumData } from "@/interfaces/curriculum.interface";
import { Clock, CreditCard } from "lucide-react";

export default function CurriculumCard({
  curriculum,
}: {
  curriculum: CurriculumData;
}) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md max-w-[500px] p-4 border">
      <div className="">
        <h3 className="font-bold text-2xl">{curriculum.semester} - semester</h3>
        <Separator className="my-2" />
      </div>
      <div className="flex flex-col gap-2">
        {curriculum.subjects.length > 0 &&
          curriculum.subjects.map((subject) => (
            <div
              className="flex items-center justify-between border-b p-2 hover:bg-gray-50 cursor-pointer transition-colors"
              key={subject._id}
            >
              <p>{subject.title}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <p className="flex items-center gap-1">
                  {subject.time_interval}
                  <Clock size={14} />
                </p>
                <span>/</span>
                <p className="flex items-center gap-1">
                  <CreditCard size={14} />
                  {subject.credit}{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <div className="">
            <h4 className="font-semibold text-lg">Tanlov fanlar</h4>
        </div>
        <div className="flex flex-col gap-2">
          {curriculum.elective_subjects.length > 0 &&
            curriculum.elective_subjects.map((subject) => (
              <div
                className="flex items-center justify-between border-b p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                key={subject._id}
              >
                <p>{subject.title}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <p className="flex items-center gap-1">
                    {subject.time_interval}
                    <Clock size={14} />
                  </p>
                  <span>/</span>
                  <p className="flex items-center gap-1">
                    <CreditCard size={14} />
                    {subject.credit}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
