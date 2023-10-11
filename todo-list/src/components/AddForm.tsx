import { Button, Paper, TextField, styled } from "@mui/material";
import { useState } from "react";

const Layout = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Input = styled(TextField)`
  flex: 1;
  margin-right: 1rem;
`;

const ButtonStyled = styled(Button)`
  padding: 0 3rem;
`;

type Props = {
  addItem: (name: string) => void;
};
export const AddForm = ({ addItem }: Props) => {
  const [text, setText] = useState<string>();

  const handleClick = () => {
    text && text?.length > 0 && addItem(text);
    setText("");
  };

  return (
    <Layout>
      <Input
        label="Add Todo"
        variant="outlined"
        value={text}
        multiline={true}
        onChange={(event) => setText(event.target.value)}
      />
      <ButtonStyled variant="contained" onClick={handleClick}>
        Add!
      </ButtonStyled>
    </Layout>
  );
};
