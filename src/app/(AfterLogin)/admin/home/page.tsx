import { Children } from "@/components/children/children.component";
import { Teachers } from "@/components/teachers/teachers.component";

const AdminHomePage = () => {
  return (
    <div>
      <h1>
      AdminHomePage
      </h1>
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