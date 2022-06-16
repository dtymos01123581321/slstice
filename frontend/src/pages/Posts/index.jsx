import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Posts.scss';
import * as postsActions from '../../utilities/redux/actions/postsActions';
import Icon from '../../components/Icon/Icon';

class Index extends Component {
  state = {
    searchValue: '',
    posts: [],
    data: {}
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.posts !== props.posts.items) {
      props.posts.items.map((post, i) =>
        setTimeout(() => {
          props.fetchData(post);
        }, 6000 * i)
      )

      return {
        posts: props.posts.items,
      };
    }
    if (state.data !== props.posts.data) {

      return {
        data: props.posts.data,
      };
    }
    return null;
  }

  render() {
    const { data } = this.state;

    if (!data.image) return (<div></div>)

    return (
      <div className="content posts">
        <div className="card-block">
          <div className="card-block__img">
            <div className="background-img" style={{ backgroundImage : `url(${data.image})` }}></div>
            <img src={data.image} className="content-img" alt="background"/>
          </div>

          <div className="card-block__post">
            <div className="card-block__post-title">
              <span>{data.profile && data.profile.username}</span>
              <img src={data.profile && data.profile.image} alt="profile"/>
            </div>
            <div className="card-block__post-description">
              <div className="card-block__post-description-title">
                {data.content && data.content.title}
              </div>
              <div className="card-block__post-description-content">
                {data.content && data.content.description}
              </div>
            </div>
            <div className="card-block__post-footer">
              <div className="card-block__post-footer-likes">
                <Icon icon="like" />
                <span>{data.statistics && data.statistics.likes} personnes</span>
              </div>
              <div className="card-block__post-footer-jours">
                <p>{`il u a ${data.date} jours`}</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  posts: state.posts,
  data: state.data,
});

const mapDispatchToProps = {
  ...postsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
