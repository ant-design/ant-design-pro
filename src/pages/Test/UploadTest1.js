import React, {PureComponent} from 'react';
import { Upload, message, Button, Icon } from 'antd';

const props = {
  name: 'files',
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  action: '/server/baseInfo/file/uploadFiles',
  headers: {
    // authorization: 'authorization-text',
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTU2MDMwNzQwOCwiZXhwIjoyNTA2Mzg3NDA4fQ.hgDNGH-0HWtD9vd1QAJC0yIbzXqldv6HyyO5q70q0kC09ypGSuPo-usnWl2WSWpwTBy1aq1VqfO87RDwv8IF-A',
  },
  data:{folder:"40e1e280-433a-4fae-bd92-dade83788698-20190726154914"},
  accept: ".xsd,.wsdl",
  onChange(info) {
    console.log("upload....:",info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class Test2 extends PureComponent {

  render() {
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

export default Test2;
