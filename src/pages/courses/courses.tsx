import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PrivateRoute from "@/private/private-route";
import { courseService } from "@/services/course.service";
import { useCourses } from "@/stores/courses/courses";
import { ListFilter, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const { setAllCourses, courses } = useCourses();
  useEffect(() => {
    (async () => {
      try {
        const data = await courseService.findAll();
        setAllCourses(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setAllCourses]);

  return (
    <div>
      <div className="my-6 shadow py-2 px-4 rounded flex items-center justify-between">
        <h4 className="font-bold">Sizga tegishli fanlar ro'yhati.</h4>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} className="cursor-pointer">
                <ListFilter />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Qidirish!</SheetTitle>
                <SheetDescription>
                  Fanlaringiz orasidan qidiring!
                </SheetDescription>
              </SheetHeader>
              <div className="">Filter qo'shamiz keyinchalik</div>
            </SheetContent>
          </Sheet>
          <PrivateRoute roles={["teacher"]}>
            <Button className="cursor-pointer">
              <Plus /> Fan qo'shish
            </Button>
          </PrivateRoute>
        </div>
      </div>
      <Table>
        <TableCaption>Fanlar ro'yhati!</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>N#</TableHead>
            <TableHead>Nomi</TableHead>
            <TableHead>Turi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses &&
            courses?.map((course, i) => {
              return (
                <TableRow key={course?._id}>
                  <TableCell>{i + 1}.</TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/courses/course/${course._id}`}
                      className="text-blue-500"
                    >
                      {course.subject.title}
                    </Link>
                  </TableCell>
                  <TableCell className="capitalize">{course.type}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
