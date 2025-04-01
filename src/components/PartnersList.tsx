
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types/supabase";

const PartnersList = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Use any to bypass type checking for supabase query
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('name') as any;
          
        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">Loading partners...</div>
      </div>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry-leading companies to provide the best opportunities for our students.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {partners.map((partner) => (
            <Card key={partner.id} className="border-0 shadow-none bg-transparent hover:shadow-md transition-shadow">
              <CardContent className="flex justify-center items-center p-4">
                <a 
                  href={partner.website_url || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-24"
                >
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersList;
