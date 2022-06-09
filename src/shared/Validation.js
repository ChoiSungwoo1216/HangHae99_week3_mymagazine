//email 형식 체크
const emailCheck = (email) => {
    let _reg =
        /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

    return _reg.test(email);
};
//비밀번호 양식
const passwordCheck = (pw) => {
    if (pw.length < 8) {
        return (false)
    } else {
        return (true);
    }
}
//비밀번호 확인
const DoubleCheck = (pw, pwcheck) => {
    if (pw === pwcheck) {
        return (true);
    } else {
        return (false);
    }
}

export { emailCheck, passwordCheck, DoubleCheck };