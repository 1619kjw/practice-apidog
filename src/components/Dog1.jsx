import { useState, useEffect } from "react";

function Dog1(){
    //현재 강아지, 업데이트용 강아지
    const [dog, setDog] = useState(null);
    
    //api 주소 불러오기(async + await 활용)
    //async function 비동기함수명(){ try{}catch{} }
    //const 비동기함수명 = async()=>{ try{}catch{} }
    //useEffect 마운트 : 컴포넌트 처음 렌더링 시 실행 훅
    //useEffect(()=>{},[]) : 기본 형태
    useEffect(()=>{
        async function getDog(){//함수명도 연관되게 작성하기
            try {
                //const response = await fetch('api주소'); //데이터불러오기
                //const data = await response.json(); //데이터를 JSON으로 변환
                const response = await fetch('https://dog.ceo/api/breeds/image/random');//api주소가져오기(모든 종 데이터 가져옴)
                const data = await response.json();//json으로 변환
                console.log(data.message);//최종결과데이터
                setDog(data);//강아지 업데이트
            }catch(error){
                /* 오류가 생기면 이렇게 보여주어라 */
                console.error('강아지 로딩 실패',error);
            }
        }
        getDog();//만든 함수를 사용해야 화면에 호출된다
    },[]) //맨 뒤에 빈 배열 설정 : 처음 렌더링(마운트)

    //useState의 dog값이 빈 값일 경우 출력 조건문
    if(!dog) return <div>강아지 사진 로딩중...</div>

    return(<>
        <h1>강아지 보여줘!</h1>
        {/* 업데이트된 setDog가 현재데이터 dog로 보여지는 거니까 */}
        <img src={dog.message} alt="" />
    </>)
}
export default Dog1;