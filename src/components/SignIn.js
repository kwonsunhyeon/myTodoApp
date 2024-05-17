const USER_EMAIL = "my@email.com";
const USER_PASSWORD = "1234";

const SignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === USER_EMAIL && password === USER_PASSWORD) {
        resolve(email);
      } else {
        reject("가입하신 정보를 확인하세요.");
      }
    }, 1000);
  });
};

export default SignIn;
