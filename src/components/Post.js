import React, { useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import Modal from "react-modal";

// Modal paketi için ana elementi vermeliyiz.
Modal.setAppElement("#root");

// Modala ait customStyles bilgileri
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
};

const Post = ({ post, updateList, removePost }) => {
  const [modalIsOpen, setIsOpen] = useState(false); // modal show or don't show information
  const [title, setTitle] = useState(post.item.title); // title
  const [oldtitle, setOldTitle] = useState(post.item.title); // title
  const [body, setBody] = useState(post.item.body); // body
  const [oldbody, setOldBody] = useState(post.item.body); // body
  const [image, setImage] = useState(post.image); // image
  const [star, setStar] = useState(post.star); // star

  // title değişimiyle birlikte tetitklenerek ilgili state değerini günceller.
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  // body değişimiyle birlikte tetitklenerek ilgili state değerini günceller.
  const handleBodyChange = (event) => {
    setBody(event.target.value);

  };
  // modalın submit edilmesiyle tetiklenecek olan metot
  const handleSubmit = () => {
    updateList({ id: post.item.id, title, body });
    if(title.length<2 && title.length<2)
    {
      setTitle(oldtitle);
      setBody(oldbody);
    }
    setIsOpen(false);
  };
  // sil butonuna tıklandığında gerçekleşecek olan metot
  function handleDelete() {
    removePost(post.item.id);
  }
  // random olarak gelen resimlerde bazen api kaynaklı olmayan resimler olabiliyor
  // bu durumun görüntüyü bozmaması için hata durumunda default bir resim belirlendi
  const handleErrorImage = () => {
    setImage("https://www.kayseri.bel.tr/uploads/kesfet/erciyes-dagi-1.jpg");
  };
  // modalın kapanmasını sağlar
  function closeModal() {
    setIsOpen(false);
  }
  // yıldızlar
  const list = [
    { name: "star1", star: "empty" },
    { name: "star2", star: "empty" },
    { name: "star3", star: "empty" },
    { name: "star4", star: "empty" },
    { name: "star5", star: "empty" },
  ];
  // random olarak gelen star puanına göre yıldızlar tam dolu, yarım dolu yada boş olarak belirlenir
  const StarRate = () => {
    let starPoint = star;
    list.map((item) => {
      if (starPoint >= 20) {
        item.star = "full";
        starPoint -= 20;
      } else if (starPoint >= 10) {
        item.star = "half";
        starPoint -= 10;
      } else {
        item.star = "blank";
      }
    });
  };
  StarRate();
  return (
    <div>
      <div className="grid-item">
        <img
          src={image}
          width={150}
          height={150}
          onError={() => handleErrorImage()}
        />
        <div className="grid-item-title">{post.item.title}</div>
        <div className="grid-item-stararea">
          {list.map((item) => {
            if (item.star === "full") {
              return <BsStarFill key={item.name} style={{ color: "#345B63" }} />;
            } else if (item.star === "half") {
              return <BsStarHalf key={item.name} style={{ color: "#345B63" }} />;
            } else {
              return <BsStar key={item.name} style={{ color: "#345B63" }}/>;
            }
          })}
          <div className="grid-item-starinfo">({star})</div>
        </div>
        <div className="grid-item-body">{body}</div>
        <div className="grid-item-buttonarea">
          <button onClick={handleDelete}>Sil</button>
          <button onClick={() => setIsOpen(true)}>Düzenle</button>
        </div>
      </div>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div onClick={closeModal} style={{ textAlign: "end", cursor:'pointer' }}>
            <ImCross />
          </div>
          <h1 style={{ textAlign: "center",color:'#11324D',fontWeight:700 }}>Post Düzenle</h1>
          <form action="" className="modal-form">
            <label htmlFor="" style={{color:'#11324D',fontWeight:500}}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="title"
              style={{backgroundColor:'#CEE5D0'}}
            />
            <label htmlFor="" style={{color:'#11324D',fontWeight:500}}>Body:</label>
            <textarea
              name=""
              id=""
              cols="60"
              rows="5"
              value={body}
              style={{backgroundColor:'#CEE5D0'}}
              onChange={handleBodyChange}
            ></textarea>
          </form>
          <button style={{ marginTop: 10,backgroundColor:'#5E454B',borderRadius:5,cursor:'pointer' }} onClick={handleSubmit}>
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Post;
