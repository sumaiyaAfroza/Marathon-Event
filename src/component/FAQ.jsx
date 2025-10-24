import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

export default function RunningClubFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What do running clubs do?",
      answer: "Running clubs bring together runners of all levels for organized group runs, training sessions, and social events. They provide structured workouts, coaching, motivation, and a supportive community. Members participate in track workouts, long runs, tempo runs, and often compete together in local races and marathons."
    },
    {
      question: "How do you promote a running club?",
      answer: "Promote your running club through social media platforms, local running stores, community bulletin boards, and fitness apps like Strava. Host free trial runs, participate in local races with club shirts, partner with local businesses, and encourage members to share their experiences. Create engaging content showcasing your club's activities and achievements."
    },
    {
      question: "What should I look for in a running club?",
      answer: "Look for a club that matches your fitness level and goals. Consider the meeting schedule, location convenience, variety of running paces, coaching quality, and club atmosphere. Check if they offer beginner-friendly groups, have experienced runners for mentorship, organize social events, and maintain a welcoming, inclusive environment."
    },
    {
      question: "What are the benefits for the running club?",
      answer: "Running clubs provide motivation, accountability, and structure to your training. You'll gain access to experienced runners and coaches, discover new routes, improve your pace through group workouts, reduce injury risk through proper training, and build lasting friendships. Clubs also offer discounts at local running stores and organized race entries."
    },
    {
      question: "Where can I subscribe to your newsletter?",
      answer: "You can subscribe to our newsletter by visiting our website's homepage and entering your email in the subscription form at the bottom. You'll receive weekly updates about upcoming runs, training tips, member achievements, and exclusive club events. We also send monthly newsletters with featured stories and running advice."
    },
    {
      question: "Why are running clubs good?",
      answer: "Running clubs transform solitary running into a social activity, making it more enjoyable and sustainable. They provide safety in numbers for early morning or evening runs, offer expert guidance to prevent injuries, create accountability to maintain consistency, and foster a sense of belonging. The shared experience and camaraderie make running more fulfilling."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            General Question
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* FAQ Section */}
          <div className="md:col-span-2 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-blue-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-blue-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    {openIndex === index ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image and Contact Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=500&fit=crop"
                alt="Runner"
                className="w-full h-72 object-cover"
              />
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <h3 className="font-semibold text-lg">
                  Do You Have More Questions?
                </h3>
              </div>
              <p className="text-blue-50 text-sm mb-4">
                Feel free to reach out to us for any additional information about our running club.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
