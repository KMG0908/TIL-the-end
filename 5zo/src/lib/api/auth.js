import apis from "apis/apis";

export const localLogin = ({mem_id, mem_pw}) => apis.post('/member/login/'+mem_id, { mem_pw });

export const localRegister = ({mem_id, mem_pw, mem_email, mem_nick}) => apis.post('/member', {mem_id, mem_pw, mem_email, mem_nick });

export const logout = () => apis.post('/member/logout');