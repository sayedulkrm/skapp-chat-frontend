// You can use that if you want to use diffrent Navbar and foorter for auth users

const AppLayout = () => (WrappedComponent: any) => {
    return (props: any) => {
        <div className="w-full h-full">
            {/* header */}
            <WrappedComponent {...props} />
            {/* Footer */}
        </div>;
    };
};

export default AppLayout;

// This how you will wrap your component

// And you components will get this header and footer automatically

// const Home = () =>{
//     return (
//         <div>
//             <h1>Home</h1>
//         </div>
//     )

// }

// export default AppLayout()(Home)
