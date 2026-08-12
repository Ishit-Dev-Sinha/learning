import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'

export function ChatMessage(props) {
  return (
    <div className={props.sender === "user" ? "user-chat" : "robot-chat"}>
      {props.sender === "robot" && <img src={ RobotProfileImage } width="50" />}
      <div className="message-box">{props.message}</div>
      {props.sender === "user" && <img src={ UserProfileImage } width="50" />}
    </div>
  );
}