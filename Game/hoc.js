import React from 'react';

const removeUserProp = (WrappedComponent, newProps) => {//代理方式
  return class WrappingComponent extends React.Component {
    render() {
      const {user, ...otherProps} = this.props;
      return <WrappedComponent {...otherProps, ...newProps} />
    }
  }
}

export default removeUserProp;

const NewComponent = removeUserProp(SampleComponent);