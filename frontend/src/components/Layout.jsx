import Header from "./Header";

export default function Layout(props) {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
