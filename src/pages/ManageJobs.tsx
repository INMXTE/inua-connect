
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addJob, updateJob, deleteJob } from '@/store/jobsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { JobType } from '@/components/JobCard';

const ManageJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Internship', 'Apprenticeship'];

  const handleAddJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newJob = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as JobType,
      salary: formData.get('salary') as string,
      description: formData.get('description') as string,
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
      posted: new Date().toLocaleDateString()
    };
    dispatch(addJob(newJob));
    event.currentTarget.reset();
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(jobId));
    }
  };

  const handleEditJob = (jobId: string) => {
    setSelectedJob(jobId);
    setIsEditing(true);
  };

  const handleUpdateJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedJob = {
      id: selectedJob!,
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as JobType,
      salary: formData.get('salary') as string,
      description: formData.get('description') as string,
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
      posted: new Date().toLocaleDateString()
    };
    dispatch(updateJob(updatedJob));
    setIsEditing(false);
    setSelectedJob(null);
    event.currentTarget.reset();
  };

  const selectedJobData = selectedJob ? jobs.find(job => job.id === selectedJob) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Job' : 'Add New Job'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={isEditing ? handleUpdateJob : handleAddJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      required 
                      defaultValue={selectedJobData?.title || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      required 
                      defaultValue={selectedJobData?.company || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      required 
                      defaultValue={selectedJobData?.location || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select name="type" defaultValue={selectedJobData?.type || 'Full-time'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input 
                      id="salary" 
                      name="salary" 
                      required 
                      defaultValue={selectedJobData?.salary || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input 
                      id="skills" 
                      name="skills" 
                      required 
                      defaultValue={selectedJobData?.skills.join(', ') || ''}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      required 
                      defaultValue={selectedJobData?.description || ''}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{isEditing ? 'Update Job' : 'Add Job'}</Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={() => {
                      setIsEditing(false);
                      setSelectedJob(null);
                    }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEditJob(job.id)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteJob(job.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ManageJobs;
