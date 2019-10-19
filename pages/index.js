import { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getUserFollowersInfo } from '../actions';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    color: rgb(30,30,30);
    font-size: 15px;
    background: rgb(253,253,253);
  }

  img {
    display: block;
  }

  a {
    text-decoration: none;
    font-size: 14px;
    color: rgb(161,161,161);
  }

  @font-face {
    font-family: 'iconfont';  /* project id 1395847 */
    src: url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.eot');
    src: url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.woff') format('woff'),
    url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1395847_4qy9ov1ayx.svg#iconfont') format('svg');
  }

  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Container = styled.div`
  padding: 30px 20%;

  .user-wrapper {
    position: relative;
    padding: 24px 20px;
    border: 1px solid #e0dcdc;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      transition: all 0.6s;
      transform: translateY(-2%);
      box-shadow: 1px 4px 10px 2px #ccc;
    }
  }

  .user-login-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 50px;
    }
  }

  .user-name {
    color: #4158fa;
    margin-bottom: 3px;
  }

  .user-info {
    max-width: 400px;
    text-align: right;
  }

  .user-status {
    margin-bottom: 3px;
    span {
      margin-left: 20px;
    }
    i {
      margin-right: 6px;
    }
  }

  .user-bio {
    font-size: 14px;
  }
`;

export default class Index extends Component {
  static async getInitialProps({ query }) {
    const user = query.username;
    if (!user) return;
    const followers = await getUserFollowersInfo(user);
    return { followers, query };
  }

  renderFollowers = () => {
    const { followers } = this.props;
    return followers.map(user => (
      <div className="user-wrapper" key={user.id}>
        <div className="user-login-wrapper">
          <img src={user.avatar_url} alt="avatar" />
          <div className="user-login">
            <div className="user-name">{user.login}</div>
            <div>
              <a href={user.html_url}>@{user.login}</a>
            </div>
          </div>
        </div>
        <div className="user-info">
          <div className="user-status">
            <span>
              <i class="iconfont">&#xebb0;</i>
              {user.followers || 0}
            </span>
            <span>
              <i class="iconfont">&#xebab;</i>
              {user.followering || 0}
            </span>
            <span>
              <i class="iconfont">&#xebaf;</i>
              {user.public_repos || 0}
            </span>
          </div>
          <div className="user-bio">{user.bio || 'no bio yet'}</div>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <Container>
        <GlobalStyle />
        {this.renderFollowers()}
      </Container>
    );
  }
}
