import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dotenv from "dotenv";
import "./Imgur.css";
dotenv.config();


class Imgur extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: null
    }

    this.uploadImage = this.uploadImage.bind(this);
  }
  uploadImage() {
    const r = new XMLHttpRequest()
    const d = new FormData()
    const e = document.getElementsByClassName('input-image')[0].files[0]
    var u

    d.append('image', e)

    r.open('POST', 'https://api.imgur.com/3/image/')
    r.setRequestHeader('Authorization', `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
    r.onreadystatechange = function () {
      if (r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText)
        u = `https://i.imgur.com/${res.data.id}.png`

        // const d = document.createElement('div')
        // d.className = 'image'
        // document.getElementsByTagName('body')[0].appendChild(d)

        const i = document.createElement('img')
        i.className = 'image-src'
        i.src = u
        document.getElementsByClassName('image')[0].appendChild(i)

        // const a = document.createElement('a')
        // a.className= 'image-link'
        // a.href = u
        // document.getElementsByClassName('image')[0].appendChild(a)

        // const p = document.createElement('p')
        // p.className = 'image-url'
        // p.innerHTML = u
        // document.getElementsByClassName('image-link')[0].appendChild(p)
      }
    }
    r.send(d)
  }
  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', `Client-ID ${process.env.REACT_APP_CLIENT_ID}`);
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  render() {
    return (
      <div>
        <div className="image"></div>
        <form>
          <input type="file" className="input-image" onChange={this.uploadImage} />
        </form>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          localization={{
            locale: 'ko'
          }}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}

export default Imgur;