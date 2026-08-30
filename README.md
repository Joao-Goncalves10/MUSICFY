# 🎵 MUSICFY - Avaliador Social de Música

Um aplicativo React Native + Expo para compartilhar avaliações de álbuns, EPs e tracks com a comunidade.

## 🎯 Objetivo

Criar uma rede social focada em críticas musicais com design moderno (Aero/Glassmorphism) e experiência de usuário intuitiva.

## ✨ Funcionalidades Principais

### 🏠 HomeScreen
- **Header customizado** com logo MUSICFY e avatar do usuário
- **Barra de busca** com glassmorphism effect
- **Card de destaque** mostrando álbum recomendado com rating
- **Feed social** com avaliações da comunidade
- **Sistema de likes** com feedback visual em tempo real
- **Dock flutuante** de navegação no fundo da tela
- **Tipografia customizada** com fontes Google importadas

### 🎨 Componentes Reutilizáveis
- **AeroButton** - Botão com design glassmorphic e animações

## 🛠️ Stack Tecnológico

```
React Native + Expo v57.0
├── expo-linear-gradient    # Gradientes atmosféricos
├── expo-blur               # Efeito glassmorphism
├── expo-font               # Carregamento de fontes
├── expo-image              # Otimização de imagens
├── @expo/vector-icons      # Ícones (Ionicons, FontAwesome, Feather)
└── @expo-google-fonts/*    # Fontas (Nunito, Plus Jakarta Sans)
```

## 🚀 Quick Start

### Instalação
```bash
cd my-app
npm install
```

### Desenvolvimento
```bash
npm start          # Menu interativo Expo
npm run android    # Rodar no Android
npm run ios        # Rodar no iOS  
npm run web        # Rodar na web
```

### Limpar Cache
```bash
npm start -- --clear
```

## 📁 Estrutura do Projeto

```
MUSICFY/
├── my-app/
│   ├── src/
│   │   ├── components/
│   │   │   └── AeroButton.jsx         # Botão reutilizável
│   │   └── screens/
│   │       └── HomeScreen.js          # Tela principal
│   ├── assets/                        # Imagens e ícones
│   ├── App.js                         # Root component
│   ├── index.js                       # Entry point
│   ├── app.json                       # Config Expo
│   └── package.json                   # Dependências
├── README.md                          # Este arquivo
└── package.json                       # Root dependências

```

## 🎨 Design System

### Paleta de Cores (Aero/Y2K Theme)
| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Aero | `#0096FF` | Primária, headings |
| Verde Lime | `#7CFF00` | CTAs, highlights |
| Rosa Neon | `#FF4FD8` | Likes, interações |
| Azul Céu | `#00C2FF` | Badges, detalhes |
| Roxo Orbital | `#915BFF` | Acentos |
| Aqua Glow | `#00FFD1` | Gradientes |

### Tipografia
- **Nunito** (800/600) - Headlines e titulos
- **Plus Jakarta Sans** (400/500/700) - Body text

### Efeitos Visuais
- **Glassmorphism** - Bordas translúcidas com gradientes
- **Sombras Suaves** - Elevação visual sutil
- **Gradientes Atmosféricos** - Fundos com múltiplas cores

## 📋 Convenções de Código

### Componentes
```javascript
/**
 * Descrição breve do componente
 * @param {string} prop1 - Descrição
 * @param {Function} prop2 - Descrição
 */
export default function MyComponent({ prop1, prop2 }) {
  // ...
}
```

### Estilos
```javascript
const styles = StyleSheet.create({
  container: {
    // Estilos em ordem: layout, typography, colors, spacing
  }
});
```

## 🔧 Configurações Importantes

### app.json
- Orientação: Portrait
- Cor de fundo Android: #E6F4FE
- Plugins: expo-image, expo-font

### Fonts Carregadas
```javascript
import {
  useFonts,
  Nunito_800ExtraBold,
  Nunito_600SemiBold,
} from '@expo-google-fonts/nunito';
```

## ⚠️ Troubleshooting

### Erro: "Cannot find module 'expo-blur'"
```bash
npm install expo-blur
```

### Fontes não aparecem
- Verifique se `useFonts` retornou `true`
- Limpe cache: `npm start --clear`

### Imagens não carregam
- Verifique URLs (começam com https://)
- Use `expo-image` para melhor performance

## 📦 Dependências Instaladas

```json
{
  "expo": "~57.0.17",
  "react": "19.2.3",
  "react-native": "0.86.3",
  "expo-linear-gradient": "^57.0.1",
  "expo-blur": "^57.0.0",
  "expo-font": "~57.0.1",
  "expo-image": "~57.0.3",
  "expo-status-bar": "~57.0.1",
  "@expo/vector-icons": "^15.1.1",
  "@expo-google-fonts/nunito": "^0.4.2",
  "@expo-google-fonts/plus-jakarta-sans": "^0.4.2"
}
```

## 🚧 Roadmap

- [ ] Navegação entre telas (React Navigation)
- [ ] Sistema de autenticação (Firebase/Auth0)
- [ ] API de música (Spotify/Last.fm)
- [ ] Persistência de dados (AsyncStorage)
- [ ] Comentários em avaliações
- [ ] Perfis de usuários
- [ ] Recomendações personalizadas
- [ ] Sistema de notificações
- [ ] Dark mode

## 📱 Testes

### Em Desenvolvimento
```bash
npm start
# Escaneie QR code com Expo Go app
```

### Build para Production
```bash
expo build:android
expo build:ios
```

## 🤝 Contribuição

1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
3. Push para a branch: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

## 📝 Licença

Licença MIT - veja LICENSE para detalhes

## 👨‍💻 Desenvolvedor

Projeto da disciplina SENAI MUSICFY

---

**Última atualização:** 30/08/2026
