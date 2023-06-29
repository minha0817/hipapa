import { Children } from "@/components/children/children.component";
import { Teachers } from "@/components/teachers/teachers.component";

const AdminHomePage = () => {
  return (
    <div>
      <div>
        <Teachers />
      </div>
      <div>
        <Children />
      </div>
    </div>
  )
}

export default AdminHomePage;