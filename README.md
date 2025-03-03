# ConsultaCEP

Este projeto é uma aplicação React Native utilizando Expo para consulta de CEPs, permitindo obter informações sobre endereços de forma simples e eficiente.

## 📦 Instalação

1. Certifique-se de ter o **Node.js** instalado em sua máquina. Se ainda não tiver, faça o download e instale através do [site oficial](https://nodejs.org/).
2. Instale o **Expo CLI** globalmente, caso ainda não tenha:
   ```sh
   npm install -g expo-cli
   ```
3. Clone este repositório:
   ```sh
   git clone https://github.com/joaovflorisvaldo/consultaCEP.git
   ```
4. Acesse a pasta do projeto:
   ```sh
   cd consultaCEP
   ```
5. Instale as dependências do projeto:
   ```sh
   npm install
   ```

## ▶️ Execução

1. Para rodar o projeto, vá na pasta do projeto, utilize o comando:
   ```sh
   npm rum web
   ```

## 🛠 Decisões Técnicas

### React Native com Expo

O uso do **Expo** foi escolhido para simplificar o desenvolvimento, permitindo um ambiente de configuração mínima e execução facilitada em múltiplas plataformas sem necessidade de configuração manual de dependências nativas. Essa escolha foi feita porque já possuo experiência com outro projeto utilizando Expo.

### Estrutura do Projeto

- **app/**: Contém os principais componentes e telas da aplicação.
- **assets/**: Armazena imagens, ícones e outros recursos estáticos.
- **components/**: Conjunto de componentes reutilizáveis.
- **constants/**: Define constantes globais utilizadas no projeto.

### Comunicação com API de CEP

A aplicação utiliza a API do **ViaCEP**, uma ferramenta amplamente conhecida e de fácil integração. Isso permite que as buscas sejam rápidas e precisas.

### Sistema de Cache

Para armazenamento de dados, optei pelo **localStorage** devido à sua simplicidade. No entanto, há espaço para aprimoramentos futuros para tornar o sistema mais robusto, caso necessário.

---
