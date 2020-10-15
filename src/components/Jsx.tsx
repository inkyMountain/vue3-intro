const Jsx = (props: { message: string }, context) => {
  // console.log('context', context);
  // console.log('props', props);
  return <div class="jsx-component">{props.message}</div>;
};

export default Jsx;
