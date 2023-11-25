import { ActionIcon, Group, Text } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import { RxAvatar } from "react-icons/rx";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";

type Rows = {
  users: any,
  isUserCheckedIn: any,
  handleUserCheckIn: any
}

export const GetRows: FC<PropsWithChildren<Rows>> = ({users, isUserCheckedIn, handleUserCheckIn }) => {
  return users.map((user: any) => {
    return (
    <tr key={user.name}>
      <td>
        <Group spacing="sm">
          {/* DB 에 image 추가해서 사진이 나올수있도록 추후 변경!!! */}
          {/* <Avatar size={30} src={user.avatar} radius={30} /> */}
          <RxAvatar />
          <Text fz="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </td>
      <td></td>
      {isUserCheckedIn(user) ? (
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleUserCheckIn(user)}>
              <TbDoorExit size={20} style={{ color: "orange" }} />
            </ActionIcon>
          </Group>
        </td>
      ) : (
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleUserCheckIn(user)}>
              <TbDoorEnter size={20} style={{ color: "skyblue" }} />
            </ActionIcon>
          </Group>
        </td>
      )}
    </tr>
  )});
};
