"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Chart from 'chart.js/auto';

const WordCountGraph = () => {
  const [wordCounts, setWordCounts] = useState<number[]>(new Array(5).fill(0)); // Initialize counts for 5 buckets
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // Redirect or handle unauthorized access
          return;
        }

        const { data, error } = await supabase
          .from('UserWords')
          .select('bucket')
          .eq('userID', user.id);

        if (error) {
          // Handle error
          console.error('Error fetching user words:', error.message);
          return;
        }

        // Calculate word counts for each bucket
        const counts = new Array(5).fill(0);
        data.forEach(({ bucket }: { bucket: number }) => {
          // Map bucket values 1-15 to 1-5
          const mappedBucket = Math.ceil(bucket / 3);
          if (mappedBucket >= 1 && mappedBucket <= 5) {
            counts[mappedBucket - 1]++;
          }
        });

        setWordCounts(counts);
      } catch (error:any) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
  }, []);

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
            label: 'Word Count',
            data: wordCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [wordCounts]);

  return (
    <div> {/* Adjust container dimensions as needed */}
      <h2>Knowledge Check</h2>
      <canvas id="wordCountChart"></canvas>
    </div>
  );
};

export default WordCountGraph;
