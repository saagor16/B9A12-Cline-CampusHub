import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Slider from './Slider';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import useMeals from '../../Hooks/useMeals';
import { useParams } from 'react-router';
import CardTabs from './CardTabs';
import Extra from './Extra';

const Home = () => {
  const categories = ['breakfast', 'lunch', 'dinner', 'all'];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);

  const [tabIndex, setTabIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [meals] = useMeals();
  
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  useEffect(() => {
    console.log('Meals:', meals); // Log meals data for debugging
    setBreakfast(meals.filter(item => item.category.toLowerCase() === 'breakfast'));
    setLunch(meals.filter(item => item.category.toLowerCase() === 'lunch'));
    setDinner(meals.filter(item => item.category.toLowerCase() === 'dinner'));
  }, [meals]);

  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className='mt-10 items-center container mx-auto text-center'>
        <h1 className='font-bold text-3xl pb-5'>Welcome to Meals by Category</h1>
        <p className='text-xl'>Select a category to see the meals.</p>
      </div>

      <div className="mt-10 container mx-auto">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="flex border-b">
            <Tab className="px-4 py-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500 text-blue-500">
              Breakfast
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500 text-blue-500">
              Lunch
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500 text-blue-500">
              Dinner
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer" selectedClassName="border-b-2 border-blue-500 text-blue-500">
              All Meals
            </Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {breakfast.length > 0 ? (
                breakfast.slice(0, 3).map(item => (
                  <CardTabs key={item._id} item={item} />
                ))
              ) : (
                <p>No breakfast items available.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lunch.length > 0 ? (
                lunch.slice(0, 3).map(item => (
                  <CardTabs key={item._id} item={item} />
                ))
              ) : (
                <p>No lunch items available.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dinner.length > 0 ? (
                dinner.slice(0, 3).map(item => (
                  <CardTabs key={item._id} item={item} />
                ))
              ) : (
                <p>No dinner items available.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {meals.length > 0 ? (
                meals.map(item => (
                  <CardTabs key={item._id} item={item} />
                ))
              ) : (
                <p>No meals available.</p>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div className='mt-10'>
        <Extra></Extra>
      </div>
    </div>
  );
};

export default Home;
