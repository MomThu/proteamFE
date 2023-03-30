export const convertUserInfoInterface = (data: any): UserInfo => {
  return {
    ...data,
    id: data.account_id,
    linkedlnLink: data.linkedln_link,
  };
};
