declare namespace User {
  interface Profile {
    account_id?: number;
    name?: string;
    email?: string;
    gpa?: number;
    school?: string;
    major?: string;
    avatar?: string;
    linkedln_link?: string;
    phone?: string;
    role?: number;
    cv?: string;
  }
  
  interface Skill {
    skill_skill_id?: number,
    skill_skill_name?: string
  }
  
}
