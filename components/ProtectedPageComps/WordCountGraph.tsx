"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Chart from 'chart.js/auto';

const WordCountGraph = () => {
  const [counts, setCounts] = useState<number[]>(new Array(5).fill(0)); // Initialize counts for 5 buckets
  const [showWords, setShowWords] = useState<boolean>(true); // State to toggle between words and kanji
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    fetchData();
  }, [showWords]); // Fetch data whenever the mode toggles

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Redirect or handle unauthorized access
        return;
      }

      const columnName = showWords ? 'bucket' : 'bucket'; // Choose column based on mode

      const { data, error } = await supabase
        .from(showWords ? 'UserWords' : 'UserKanji')
        .select(columnName)
        .eq('userID', user.id);

      if (error) {
        // Handle error
        console.error(`Error fetching user ${showWords ? 'words' : 'kanji'}:`, error.message);
        return;
      }

      // Calculate counts for each bucket
      const newCounts = new Array(5).fill(0);
      data.forEach(({ [columnName]: bucket }: { [columnName]: number }) => {
        // Map bucket values 1-15 to 1-5
        const mappedBucket = Math.ceil(bucket / 2);
        if (mappedBucket >= 1 && mappedBucket <= 5) {
          newCounts[mappedBucket - 1]++;
        }
      });

      setCounts(newCounts);
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    // Destroy the existing chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Draw the bar graph
    const ctx = document.getElementById('wordCountChart') as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Rookie', 'Amateur', 'Expert', 'Master', 'Gigachad'],
          datasets: [{
            label: showWords ? 'Word Count' : 'Kanji Count',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1 // Display only whole numbers on the y-axis
              }
            },
          },
        },
      });
    }
  }, [counts, showWords]);

  return (
    <div> {/* Adjust container dimensions as needed */}
      <h2 className="text-center">Knowledge Check</h2>
      <div className="text-center mb-3">
        <button onClick={() => setShowWords(!showWords)}>
          {showWords ? 'Toggle to Kanji' : 'Toggle to Words'}
        </button>
      </div>
      <canvas id="wordCountChart"></canvas>
    </div>
  );
};

export default WordCountGraph;
