'use client';
import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  timestamp: string;
  activity: "FAVORITED" | "WATCH_LATER";
  title: string;
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch recent activities from the API
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activities`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="mt-6 bg-tealBright rounded-lg p-5">
      <h2 className="text-xl font-bold text-blue mb-4">Latest Activities</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="text-blue mb-2">
              {new Date(activity.timestamp).toLocaleDateString('en-US')} {new Date(activity.timestamp).toLocaleTimeString('en-US')} - {activity.activity === "FAVORITED" ? "Favorited" : "Added to Watch Later"} <span className='font-bold'>{activity.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-blue">No recent activities</p>
      )}
    </div>
  );
};

export default ActivityFeed;
