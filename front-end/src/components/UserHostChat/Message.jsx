import "./Message.css";

export const MessageChat = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageimg"
          src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <p className="messageText">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
          incidunt dicta quibusdam ipsa iusto ex non repellat placeat
          consequuntur ratione sequi ab perferendis, vitae exercitationem beatae
          officia, mollitia pariatur inventore?
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};
