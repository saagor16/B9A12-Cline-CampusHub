import { useNavigate } from 'react-router-dom';

const MembershipSection = () => {
  const navigate = useNavigate();

  const packages = [
    { name: 'Silver', price: 20 },
    { name: 'Gold', price: 50 },
    { name: 'Platinum', price: 100 },
  ];

  const colors = ['bg-blue-200', 'bg-green-200', 'bg-red-200']; // List of background colors

  const handlePackageClick = (packageName) => {
    navigate(`/payment/${packageName}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-600">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.name}
            className={`cursor-pointer rounded shadow-md text-center hover:shadow-lg transition-shadow animate-fadeIn ${colors[index % colors.length]}`}
            onClick={() => handlePackageClick(pkg.name)}
          >
            <h2 className="relative text-xl font-semibold mb-2">{pkg.name} Package</h2>
            <p className="relative text-lg">${pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipSection;
