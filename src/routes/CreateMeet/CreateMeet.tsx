import { Link } from "react-router-dom";

// TODO(세현): 모임 생성 추가
const CreateMeet = () => {
  // example
  const id = 2;

  return (
    <Link
      style={{
        padding: 20,
        backgroundColor: "navy",
        borderRadius: 20,
        margin: 20,
        color: "white",
      }}
      to={`meet/${id}`}
    >
      생성 후 이동
    </Link>
  );
};

export default CreateMeet;
