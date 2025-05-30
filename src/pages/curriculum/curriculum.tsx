import { curriculumService } from "@/services/curriculum.service";
import { useAuth } from "@/stores/auth/auth";
import { useCurriculum } from "@/stores/curriculum/curriculum";
import { useEffect } from "react";
import CurriculumCard from "./_components/curriculum-card";

export default function Curriculum() {
  const { auth } = useAuth();
  const { curriculums, setCurriculums } = useCurriculum();

  useEffect(() => {
    (async () => {
      try {
        if (!auth || "student" in auth === false) return;

        const data = await curriculumService.findAllByGroup(
          auth.student?.group
        );
        setCurriculums(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setCurriculums]);

  return (
    <div className="p-4">
      {curriculums?.map((curriculum) => (
        <CurriculumCard key={curriculum._id} curriculum={curriculum} />
      ))}
    </div>
  );
}
