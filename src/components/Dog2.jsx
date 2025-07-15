import { useState, useEffect } from "react"; //버튼 누르면 사진이 가져와지게 할거라 상태변경훅 사용

function Dog2(){
    const [dogBtn, setDogBtn] = useState(null)

    //api(데이터)불러오기 //return과 function사이에 위치
    const fetchDog = async ()=>{//async랑 소괄호 사이 공백은 그냥 가독성 때문에 넣어준 것임
        try{
            //api주소를 가져오는(fetch) 동안 기다리다가, 다 가져와지면 response에 대입한다
            const response = await fetch('https://dog.ceo/api/breed/terrier/toy/images/random')
            //json으로 변환할 동안 잠깐 기다리다락, 다 변환이 되면 data에 대입한다
            const data = await response.json();
            console.log(data);
            setDogBtn(data.message)//전달할 것을 작성
        }catch(error){
            console.error('강아지 로딩 실패',error);
        }
    }
    useEffect(()=>{//속도저하 방지
        fetchDog();
    },[])
    //fetchDog();//fetchDog가 끝나는 지점 이후에 작성(지금은 아래에서 사용할거라 필요없어서 삭제)

    return(<>
        <button onClick={fetchDog}>강아지 호출버튼</button><br />{/* 버튼을 클릭했을때 fetchDog함수를 실행한다 */}
        {/* 상태관리 button이 아닌 경로가 변경되는 img에 적용됨 */}
        {/* img에 useState 변수를 삽입하고 button은 api함수를 호출해야한다. */}
        {/* api함수를 호출하는 위치에 img에 대입할 useState값을 업데이트해야한다. */}
        <img src={dogBtn} alt="" style={{width:'400px'}} />{/* img에서는 업데이트되는게 아니라, 최종값만 받는 것이다 */}
    </>)
}
export default Dog2;

//button을 클릭할때마다 fetchDog를 가져와야하는데 fetchDog는 마운트에 들어잇으니까 한번만 실행되고 말아서 적용이 안됨.
//fetchDog를 useEffect밖으로 뺀다. 그리고 useEffect안에 fetchDog() 함수를 실행한다.
//갑자기 빠르게 사진이 두번 ㄴ오는건 리액트고유특징이고, 실제 배포했을때는 그런거 없어지니까 무시하기
