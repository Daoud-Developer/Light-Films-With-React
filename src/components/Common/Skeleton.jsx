const Skeleton = ({ className, children, ...others }) => {
    return (<div className={`${className} animate-pulse bg-dark-lighten rounded-md `} {...others}>
      {children}
    </div>);
};
export default Skeleton;
