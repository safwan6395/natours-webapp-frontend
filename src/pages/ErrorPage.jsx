function ErrorPage() {
  return (
    <main className='main'>
      <div className='error'>
        <div className='error__title'>
          <h2 className='heading-secondary heading-secondary--error'>
            Oops! Something went wrong!{" "}
          </h2>
          {/* <h2 className='error__emoji'>😢🤯</h2> */}
        </div>
        <div className='error__msg'>This page does not exists!</div>
      </div>
    </main>
  );
}
export default ErrorPage;
