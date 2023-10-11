import { Checkbox, ListItem, TextField, Typography } from "@mui/material";
import { styled } from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useState } from "react";

const Item = styled(ListItem)`
  border-bottom: 1px solid lightgrey;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Input = styled(TextField)`
  flex: 1;
`;
const TodoSideContainer = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EditIcon = styled(DriveFileRenameOutlineIcon)`
  cursor: pointer;
  border-radius: 50%;
  margin-left: 1rem;

  &: hover {
    box-shadow: 0 0 10px 1px lightgrey;
  }

  &: active {
    box-shadow: 0 0 10px 1px grey;
  }
`;
const FinishIcon = styled(DoneOutlineIcon)`
  cursor: pointer;
  border-radius: 50%;
  margin-left: 1rem;

  &: hover {
    box-shadow: 0 0 10px 1px lightgrey;
  }

  &: active {
    box-shadow: 0 0 10px 1px grey;
  }
`;
const TrashIcon = styled(DeleteForeverIcon)`
  cursor: pointer;
  border-radius: 50%;
  margin-left: 1rem;

  &: hover {
    box-shadow: 0 0 10px 1px lightgrey;
  }

  &: active {
    box-shadow: 0 0 10px 1px grey;
  }
`;

type Props = {
  id: string;
  name: string;
  completed: boolean;
  isEditing: boolean;
  setIsEditing: (newName: string) => void;
  onChecked: (id: string) => void;
};
export const Todo = ({
  id,
  name,
  completed,
  isEditing,
  setIsEditing,
  onChecked,
}: Props) => {
  const [updatedName, setUpdatedName] = useState<string>(name);

  return (
    <Item>
      <Container>
        <TodoSideContainer>
          <Checkbox checked={completed} onChange={() => onChecked(id)} />
        </TodoSideContainer>
        <TodoContent>
          {isEditing ? (
            <Input
              value={updatedName}
              multiline={true}
              variant="standard"
              onChange={(event) => setUpdatedName(event.target.value)}
            />
          ) : (
            <Typography>{name}</Typography>
          )}
        </TodoContent>
        <TodoSideContainer>
          {isEditing ? (
            <FinishIcon
              onClick={() => setIsEditing(updatedName)}
              color="success"
              fontSize="medium"
            />
          ) : (
            <EditIcon
              onClick={() => setIsEditing(updatedName)}
              color="primary"
              fontSize="medium"
            />
          )}
          <TrashIcon color="error" fontSize="medium" />
        </TodoSideContainer>
      </Container>
    </Item>
  );
};
