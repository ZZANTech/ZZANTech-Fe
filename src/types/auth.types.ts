export type TInputs = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export type TLoginInputs = {
  email: string;
  password: string;
};

export type TNicknameModalInputs = {
  nickname: string;
};

export type TEditPasswordInputs = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
