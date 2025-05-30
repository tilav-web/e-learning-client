import { groupService } from "@/services/group.service";
import { useEffect } from "react";

export default function Groups() {
  useEffect(() => {
    (async () => {
      try {
        const data = await groupService.findAll();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <div>Groups</div>;
}
