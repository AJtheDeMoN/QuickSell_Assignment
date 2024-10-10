import logo from './logo.svg';
import './App.css';
import TicketCard from './components/TicketCard';

const ticketData = {
  tickets: [
    {
      id: "CAM-10",
      title: "Conduct Security Vulnerability",
      tag: ["Feature Request"],
      userId: "usr-4",
      status: "Backlog",
      priority: 1
    }
  ],
  users: [
    { id: "usr-1", name: "Anoop sharma", available: false },
    { id: "usr-2", name: "Yogesh", available: true },
    { id: "usr-3", name: "Shankar Kumar", available: true },
    { id: "usr-4", name: "Ramesh", available: false },
    { id: "usr-5", name: "Suresh", available: true }
  ]
};

function App() {
  const ticket = ticketData.tickets[0];
  const user = ticketData.users.find(u => u.id === ticket.userId);
  return (
    <div >
      <TicketCard ticket={ticket} user={user} />
    </div>
  );
}

export default App;
