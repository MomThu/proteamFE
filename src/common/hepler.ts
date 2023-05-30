export const convertUserInfoInterface = (data: any): UserInfo => {
  return {
    ...data,
    id: data.account_id,
    linkedlnLink: data.linkedln_link,
  };
};

export const scrollToView = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
};
