import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AxiosBase from "../config/AxiosBase";
import Loading from "./Loading";
import Post from "./Post";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
    };
  }
  // AxiosBase ile verilen baseUrl bilgisi ile fetch işlemi
  // gerçekleştirilip postList içerisine aktarıldı.
  componentDidMount() {
    AxiosBase.get("/posts").then((res) =>
      this.setState({ postList: res.data })
    );
  }
  // random bir index oluşturulup ilgili siteden rastgele fotoğraflar
  // gelmesi sağlandı
  getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 300) + 1;
    return `https://picsum.photos/id/${randomIndex}/150/150`;
  };
  // yıldızlar için 1-100 arası random sayılar oluşturuldu.
  getRandomStar = () => {
    const randomStar = Math.floor(Math.random() * 100) + 1;
    return randomStar;
  };
  // modal üzerinden bir güncelleme işlemi gerçekleştirildiğinde
  // bu metot vasıtasıyla state güncellenir ve başarılı notificationu çıkarılır.
  updateList = ({ id, title, body }) => {
    const { postList } = this.state;
    const index = postList.findIndex((item) => item.id === id);
    if(title.length>2 && body.length>2)
    {
    postList[index].title = title;
    postList[index].body = body;
    NotificationManager.success('Post Güncellendi', 'Başarılı');
    }
    else{
      NotificationManager.error('2 Karakterden az olamaz','Başarısız');
    }
  };

  // silme işlemi gerçekleştirildiğinde bu metot vasıtasıyla
  // state üzerinden silme işlemi gerçekleştirilir.
  removePost = (id) => {
    const { postList } = this.state;
    const result = postList.filter((item) => item.id !== id);
    this.setState({ postList: result });
    NotificationManager.warning("Post Silindi", "Silindi");
  };

  render() {
    const { postList } = this.state;
    if(postList.length<2){
      return (<Loading/>)
    }
    return (
      <div style={{display:'flex',justifyContent:'center'}}>
        <NotificationContainer />
        <div className="grid-container">
          {postList.map((item) => (
            <Post
              key={item.id}
              post={{
                item: item,
                image: this.getRandomImage(),
                star: this.getRandomStar(),
              }}
              updateList={this.updateList}
              removePost={this.removePost}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PostList;
