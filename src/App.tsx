import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ 
      backgroundColor: '#FFF9FB', 
      minHeight: '100vh', 
      padding: '40px 15px', // Mobilde kenarlardan taşmasın diye kıstık
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transition: 'background-color 0.5s ease'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          color: '#FFB7B2', 
          fontSize: 'clamp(2rem, 8vw, 3.5rem)', // Ekran küçüldükçe yazı da küçülür
          fontWeight: 'bold',
          marginBottom: '10px',
          letterSpacing: '-1px'
        }}>
          Pastel To-Do ✨
        </h1>
        <p style={{ 
          color: '#BDBDBD', 
          fontSize: '1.1rem',
          fontWeight: '300'
        }}>
          Create your own to-do list
        </p>
      </header>

      <main style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        animation: 'fadeIn 0.8s ease-in' // Sayfa açılırken yumuşakça gelsin
      }}>
        <TodoList />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '60px', 
        color: '#E0E0E0', 
        fontSize: '0.85rem' 
      }}>
        Coded by İlayda ♡
      </footer>

      {/* Basit bir animasyon efekti için gizli stil */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;