import Boxes from './Boxes';

const Layout: React.FC = () => {
  return (
    <div className="bg-[#FFF8EF] dark:bg-[#0d1526] text-center md:text-right
      pl-0 md:pl-28 pr-0 md:pr-16 pt-0 md:pt-36 pb-0 md:pb-28
      flex justify-center items-center transition-colors duration-300">
      <Boxes />
    </div>
  );
};

export default Layout;