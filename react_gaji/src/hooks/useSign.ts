declare global {
  interface Window {
    daum: any; // 카카오 api
  }
}


export interface PostCodeData {
  zonecode: string;
  address: string;
  extraAddress: string;
}

// 우편번호 API 실행 함수
// 상태업데이트를 하는 tsx에 import해서 사용
// 상태 업데이트 까지 할꺼면
// (setPostCodeData: (data: PostCodeData) => void): void => 이걸 써도 되지만
// pages 폴더에서 따로 상태관리를 할 꺼기 때문에 여기선 Promise<PostCodeData>를 사용용
export const executeDaumPostCode = (): Promise<PostCodeData> => {
  return new Promise((resolve, reject) => {
    const { daum } = window;

    new daum.Postcode({
      oncomplete: (data: any) => {
        let addr = ""; // 기본 주소
        let extraAddr = ""; // 참고 항목

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        // 도로명 주소 참고 항목 조합
        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? `. ${data.buildingName}` : data.buildingName;
          }

          if (extraAddr !== "") {
            extraAddr = ` (${extraAddr})`;
          }
        }

        resolve({
          zonecode: data.zonecode,
          address: addr,
          extraAddress: extraAddr,
        });

        // 상태 업데이트를 위한 데이터 전달
        // setPostCodeData({
        //     zonecode: data.zonecode,
        //     address: addr,
        //     extraAddress: extraAddr,
        // });
      },
      onerror: (error: any) => {
        reject(error);
      },
    }).open();
  });
};

const api = 'http://localhost:3000';

// 이메일 유효성 검증
export const validateEmail = (email: string): string | null => {
  const emailRegx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  return emailRegx.test(email) ? null : "유효한 이메일이 아닙니다.";
};

// 비밀번호 유효성 검증
export const validatePassword = (password: string): string | null => {
  const passwordRegx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8, 12}$/;

  return passwordRegx.test(password)
    ? null
    : "비밀번호는 최소 대문자, 특수문자, 숫자가 포함된 8~12자리를 입력해야합니다.";
};

//휴대폰 유효성 검증

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^01(0|1[6-9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

  return phoneRegex.test(phone) ? null : "없는 전화번호 입니다.";
};

// 아이디 중복

export const checkId = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${api}/auth/validateId`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const results = await response.json();

    return results.isCheck;
  } catch (error) {
    console.error("중복된 아이디 입니다.", error);

    throw error;
  }
};

// 이메일 인증

export const emailCheck = async (code: string): Promise<{validate: boolean, codeNum: string}> => {
  try {
    const response = await fetch(`${api}/auth/emailCheck`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const results = await response.json();

    return results;
  } catch (error) {
    console.error(`코드번호가 맞지 않습니다.`, error);

    throw error;
  }
};

//이메일 인증번호 전송

export const emailSend = async (email: string): Promise<{success: boolean, code: number}> => {
  try {
    const response = await fetch(`http://localhost:3000/auth/emailSend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
    });


    console.log('프런트에서 가져온 body값:', response);
    
    
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const results = await response.json();
    

    console.log('서버에서 가져온 results값:', results);
    

    return results;
  } catch (error) {
    console.log('useSign에서 받은 이메일:', email);
    
    console.error(`코드 전송이 실패 했습니다`, error);

    throw error;
  }
};

//회원가입

export const signUp = async (data: Record<string, string>): Promise<any> => {
  try {
    const response = await fetch(`${api}/auth/signUp`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log('입력된 데이터:', response.body);
    

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("데이터 전송 실패:", error);

    throw error;
  }
};
