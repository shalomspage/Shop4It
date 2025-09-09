import ProfileTabs from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
  return (
    <section className="min-h-screen main-max-width padding-x mx-auto my-10">
      <h1 className="text-2xl font-bold mb-8 text-center">My Profile</h1>
     
      <ProfileTabs />
    </section>
  );
}
