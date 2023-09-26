"use client";
import styles from "./adminMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { AddAdminMessagesModal } from "@/components/adminMessages/addAdminMessagesModal/addAdminMessagesModal.component";
import { AdminMessagesTable } from "@/components/adminMessages/adminMessagesTable/adminMessagesTable.component";
import { getChildren } from "@/app/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/dbModels/types";

const adminMessagesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [children, setChildren] = useState<Child[]>([])

  const supabase = createClientComponentClient();
  
  useEffect(() => {
    getChildren(supabase).then(setChildren)
  }, [supabase])

  return (
    <div className={styles.adminMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        <AddAdminMessagesModal childrenList={children}/>
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      {/* Messages table component */}
      <AdminMessagesTable />
    </div>
  );
};

export default adminMessagesPage;
