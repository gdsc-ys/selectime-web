import { parseNum } from "@/utils/jsUtils";
import { useParams } from "react-router-dom";

const Meet = () => {
  const { meetId: _meetId } = useParams<"meetId">();
  const meetId = _meetId ? parseNum(_meetId) : null;
  if (!meetId) return <></>;

  // TODO: meetId 사용해서 미팅 정보 가져오고 시간 선택
  return <></>;
};

export default Meet;
