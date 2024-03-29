// DAYJS PLUGINS
dayjs.extend(dayjs_plugin_customParseFormat);

const app = new Vue ({
    el: '#app',
    data: {
        // Elenco contatti
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible:    true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        indexContact: 0,
        newSentMessage : '',
        keyword : '',
        filteredArray : [],
        lastAccess : ''
        // contacts[indexContact].messages[contacts[indexContact].messages.length - 1].date
    },

    computed: {

    },
    //fa vedere filteredArray 
    mounted() {
        this.search();
        // console.log(this.lastAccess);



    },

    methods: {

        /**
         * apre la chat selezionata
         * @param {number} index 
         */
        setChat(index) {
            this.indexContact = index;
        },
        

        /**
         * invia il messaggio al contatto selezionao
         * @param {number} indexContact 
         */
        sentMessages(indexContact) {
            //console.log(this.newSentMessage );
            if(this.newSentMessage !== '') {
                //push il nuobo messaggio nell'array messages
                this.contacts[indexContact].messages.push({
                    date: this.currentDate(),
                    message: this.newSentMessage,
                    status: 'sent'
                })
                // reset
                this.newSentMessage = '';
                // il contatto risponde 'ok' dopo 1 secondo
                this.contactResponse();
            } 
        },

        /**
         * risposta automatica del contatto
         */
        contactResponse() {
            setTimeout(() => {
                // il contatto risponde 'ok' dopo 1 secondo
                this.contacts[this.indexContact].messages.push({
                    date: this.currentDate(),
                    message: 'ok',
                    status: 'received'
                })
            }, 1000) 
        },

        /**
         * cerca la keyword inserita e fa vedere i contatti che la contengono
         */
        search() {
            if(this.keyword.length > 0) {
                this.filteredArray = this.contacts.filter(element => {
                    return element.name.toLowerCase().includes(this.keyword.toLowerCase())
                });
            } else {
                this.filteredArray = this.contacts;

            }

       },

       currentDate: () => dayjs().format('DD/MM/YYYY hh:mm:ss'),

       getLastAcces () {
        return this.contacts[this.indexContact].messages[this.contacts[this.indexContact].messages.length - 1].date
       }


    },

})
